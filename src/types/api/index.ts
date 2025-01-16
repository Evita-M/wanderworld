type Create = {
  variant: 'create';
};

type Edit = {
  variant: 'edit';
  id: string;
};

// expedition
export type ExpeditionCommon = {
  email: string;
  name: string;
  guideFirstName: string;
  guideLastName: string;
  countries: string[];
  gender: string;
  languages: string[];
  activities: string[];
  meetingDateTime: string;
  tourDuration: [string, string];
  groupSize: [number, number];
  hasParticipants: boolean;
  participants: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }[];
};

export type CreateExpedition = ExpeditionCommon & (Create | Edit);
export type ExpeditionResponse = Edit & ExpeditionCommon;

// guide
export type GuideCommon = {
  firstName: string;
  lastName: string;
  email: string;
  languages: string[];
};

export type CreateGuide = GuideCommon & (Create | Edit);

export interface GenerateExpeditionRequestBody {
  name: string;
  countries: string[];
  languages: string[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}
