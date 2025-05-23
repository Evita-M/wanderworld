import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import {
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/error-handler/error-handler';
import { Country } from '@/shared/types/country';
import { Language } from '@/shared/types/language';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface GenerateExpeditionRequestBody {
  name: string;
  countries: Country[];
  languages: Language[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}

async function generateExpeditionDescription(request: NextRequest) {
  try {
    const requestBody: GenerateExpeditionRequestBody = await request.json();

    if (!requestBody) {
      return getNotFoundResponse('Form data input');
    }

    // Transform countries and languages to match the expected format
    const countryNames = requestBody.countries.map((country) => country.name);
    const languageNames = requestBody.languages.map(
      (language) => language.name
    );

    const prompt = `
	You are a travel expert AI assistant and professional content editor. Your job is to generate a detailed description
	 for an expedition with the following Description Data in this specific Description Content and always following the Description Rules.

	# Description Data:
    - Name: ${requestBody.name}
    - Countries: ${countryNames.join(', ')}
    - Languages: ${languageNames.join(', ')}
    - Activities: ${requestBody.activities.join(', ')}
    - Group size: ${requestBody.groupSize[0]} to ${requestBody.groupSize[1]} people
    - Duration: From ${new Date(requestBody.tourDuration[0]).toLocaleDateString()} to ${new Date(requestBody.tourDuration[1]).toLocaleDateString()}
    - Meeting date: ${new Date(requestBody.meetingDate).toLocaleString()}

	# Description Content:
	The expedition details encompass a comprehensive title, followed by a detailed description outlining the journey,
	a structured itinerary mapping out the schedule, a clear list of what's included in the package, essential items
	participants should bring along, practical information about what to expect during the expedition, and a helpful FAQ section addressing common queries.

	# Description Rules:
	- Each section should be in a separate paragraph.
	- The description should have only one title at the beginning.
	- The description should be in English.
	- The description should be in 1000-1500 characters.
	- The description should not contain lists of countries, languages or activities. Instead it should be a single or multiple paragraph with all the information.
	- The description should be engaging and interesting.
	- The description should be in HTML format with <p>, <strong>, <em> tags.
    - The dates in the description should be in the format of "January 1st, 2025".`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({
      description: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error generating description:', error);
    return getServerErrorResponse(error);
  }
}

export { generateExpeditionDescription as POST };
