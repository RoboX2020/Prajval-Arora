import { useEffect, useRef, useState } from 'react';

type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type RecognitionError = { error?: string };
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionError) => void) | null;
  onend: (() => void) | null;
};

function recognitionCtor(): (new () => Recognition) | null {
  const root = window as Window & {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return root.SpeechRecognition || root.webkitSpeechRecognition || null;
}

export function speechInputSupported(): boolean {
  return typeof window !== 'undefined' && Boolean(recognitionCtor());
}

export function speechOutputSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  window.speechSynthesis?.cancel();
}

export function speakText(text: string): void {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const chunks = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const pieces = chunks.length ? chunks : [text.trim()];
  pieces.slice(0, 12).forEach((piece) => {
    const utterance = new SpeechSynthesisUtterance(piece);
    utterance.rate = 1;
    utterance.lang = 'en-US';
    synth.speak(utterance);
  });
  window.setTimeout(() => synth.resume(), 250);
}

export function useSpeechInput(onFinal: (text: string) => void) {
  const onFinalRef = useRef(onFinal);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const recRef = useRef<Recognition | null>(null);

  useEffect(() => {
    onFinalRef.current = onFinal;
  }, [onFinal]);

  useEffect(() => () => recRef.current?.stop(), []);

  function stop() {
    recRef.current?.stop();
    setListening(false);
  }

  function start() {
    const Ctor = recognitionCtor();
    if (!Ctor) {
      setError('This browser has no speech recognition.');
      return;
    }
    stopSpeaking();
    setError('');
    setInterim('');
    const recognition = new Ctor();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let finalText = '';
      let live = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += piece;
        else live += piece;
      }
      setInterim(live);
      if (finalText.trim()) {
        setInterim('');
        onFinalRef.current(finalText.trim());
      }
    };
    recognition.onerror = (event) => {
      setListening(false);
      if (event.error && event.error !== 'aborted' && event.error !== 'no-speech') {
        setError(event.error === 'not-allowed' ? 'Microphone permission was blocked.' : 'Speech recognition stopped.');
      }
    };
    recognition.onend = () => setListening(false);
    recRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return { listening, interim, error, start, stop, supported: speechInputSupported() };
}
