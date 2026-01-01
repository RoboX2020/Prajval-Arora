import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const getAiClient = () => {
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateRadioIntro = async (projectTitle: string, projectDesc: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return `Now playing: ${projectTitle}. It's a cool project.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a chill, late-night radio DJ on a road trip station. 
      The driver just passed a landmark called "${projectTitle}".
      Description: "${projectDesc}".
      
      Write a very short, smooth, 1-sentence intro for this "track" (project). 
      Keep it relaxed, maybe make a small driving pun.`,
    });
    return response.text || `Coming up next, we have ${projectTitle}.`;
  } catch (error) {
    return `You're listening to ${projectTitle}.`;
  }
};

export const generateWelcomeMessage = async (): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Welcome to the road. Use Arrow Keys to drive.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, welcoming message for a portfolio website that looks like a road trip game. 
      Tell the user to use Left/Right keys to drive. Be brief and peaceful.`,
    });
    return response.text || "Buckle up. Use Left/Right keys to explore.";
  } catch (error) {
    return "Welcome. Use Arrow Keys to drive.";
  }
};