export type FieldDef = { label: string; name: string; wide?: boolean };
export type SectionDef = { title: string; fields: FieldDef[] };

export const FORM_SECTIONS: Record<string, SectionDef[]> = {
  "Individual Therapy": [
    {
      title: "Contact Information",
      fields: [
        { label: "Full Name", name: "name" },
        { label: "Date of Birth", name: "dob" },
        { label: "Phone", name: "phone" },
        { label: "Email", name: "email" },
        { label: "Preferred Contact Method", name: "preferredContact" },
        { label: "City / Country", name: "city" },
        { label: "Occupation", name: "occupation" },
        { label: "Session Format", name: "sessionFormat" },
        { label: "Best Days to Meet", name: "bestDays" },
        { label: "Preferred Time", name: "preferredTime" },
        { label: "Emergency Contact", name: "emergencyContact" },
      ],
    },
    {
      title: "About You",
      fields: [
        { label: "Gender", name: "gender" },
        { label: "Relationship Status", name: "relationshipStatus" },
        { label: "Living Situation", name: "livingSituation" },
        { label: "Has Children", name: "hasChildren" },
        { label: "Children Context", name: "childrenContext", wide: true },
        { label: "Employment Status", name: "employmentStatus" },
        { label: "Faith Background", name: "faithBackground" },
      ],
    },
    {
      title: "Reason for Seeking Therapy",
      fields: [
        { label: "What Brings You to Therapy", name: "mainConcern", wide: true },
        { label: "Areas of Concern", name: "concernsList", wide: true },
        { label: "Other Concern Detail", name: "otherConcernDetail", wide: true },
      ],
    },
    {
      title: "Current Functioning (1 = difficulty, 5 = doing well)",
      fields: [
        { label: "Sleep Quality", name: "sleepQuality" },
        { label: "Energy Levels", name: "energyLevels" },
        { label: "Concentration / Focus", name: "concentration" },
        { label: "Emotional Regulation", name: "emotionalReg" },
        { label: "Quality of Relationships", name: "relationships" },
        { label: "Daily Functioning", name: "dailyFunctioning" },
        { label: "Appetite", name: "appetite" },
        { label: "Physical Activity", name: "physicalActivity" },
      ],
    },
    {
      title: "Mental Health & Medical Background",
      fields: [
        { label: "Mental Health Diagnosis", name: "mhDiagnosis" },
        { label: "Diagnoses", name: "mhDiagnosisList", wide: true },
        { label: "On Medication", name: "onMedication" },
        { label: "Medication Details", name: "medicationDetails", wide: true },
        { label: "Other Mental Health Provider", name: "otherProvider" },
        { label: "Other Provider Detail", name: "otherProviderDetail", wide: true },
        { label: "Significant Medical Conditions", name: "medicalConditions" },
        { label: "Medical Conditions Detail", name: "medicalConditionsDetail", wide: true },
        { label: "Family Mental Health History", name: "familyMentalHealth" },
      ],
    },
    {
      title: "Therapy History",
      fields: [
        { label: "Previous Therapy", name: "previousTherapy" },
        { label: "Previous Therapy Duration", name: "prevTherapyDuration" },
        { label: "Previous Therapy Feedback", name: "prevTherapyFeedback", wide: true },
        { label: "Therapeutic Approaches", name: "therapyApproaches", wide: true },
      ],
    },
    {
      title: "Goals & Therapeutic Preferences",
      fields: [
        { label: "Goals for Therapy", name: "goals", wide: true },
        { label: "Therapist Style Preference", name: "therapistPreference" },
        { label: "Homework Preference", name: "homeworkPreference" },
        { label: "Faith in Sessions", name: "faithInSessions" },
        { label: "Additional Information", name: "additionalInfo", wide: true },
        { label: "How Did You Hear About Us", name: "referral" },
      ],
    },
    {
      title: "Safety & Wellbeing",
      fields: [
        { label: "Thoughts of Self-Harm", name: "selfHarmThoughts" },
        { label: "Thoughts of Harming Others", name: "harmOthersThoughts" },
        { label: "Unsafe Home Situation", name: "unsafeHomeSituation" },
        { label: "Substance Use Affecting Life", name: "substanceUseAffecting" },
        { label: "Additional Safety Context", name: "safetyAdditional", wide: true },
      ],
    },
  ],

  "Marriage Coaching": [
    {
      title: "Contact Information",
      fields: [
        { label: "Partner 1 — Full Name", name: "partner1Name" },
        { label: "Partner 2 — Full Name", name: "partner2Name" },
        { label: "Phone", name: "phone" },
        { label: "Email", name: "email" },
        { label: "City", name: "city" },
        { label: "Preferred Date", name: "preferredDate" },
        { label: "Preferred Time", name: "preferredTime" },
      ],
    },
    {
      title: "Relationship Background",
      fields: [
        { label: "How Long Together", name: "togetherness" },
        { label: "Relationship Status", name: "relationshipStatus" },
        { label: "Children Together", name: "childrenTogether" },
        { label: "Ages of Children", name: "childrenAges" },
      ],
    },
    {
      title: "Reason for Seeking Therapy",
      fields: [
        { label: "What Brings You to Therapy", name: "reason", wide: true },
        { label: "Primary Concerns", name: "primaryConcerns", wide: true },
      ],
    },
    {
      title: "Therapy History",
      fields: [
        { label: "Individual Therapy (either partner)", name: "individualTherapy" },
        { label: "Previous Couples Therapy", name: "previousCouplesTherapy" },
        { label: "Previous Therapy Feedback", name: "previousTherapyFeedback", wide: true },
      ],
    },
    {
      title: "Goals & Fit",
      fields: [
        { label: "Successful Outcome", name: "successOutcome", wide: true },
        { label: "Both Partners Willing", name: "bothWilling" },
        { label: "How Did You Hear About Us", name: "referral" },
      ],
    },
    {
      title: "Safety & Wellbeing",
      fields: [
        { label: "Domestic Violence / Safety Concern", name: "domesticSafety" },
        { label: "Either Partner in Crisis", name: "currentCrisis" },
      ],
    },
  ],

  "Child & Adolescent Therapy": [
    {
      title: "Child Information",
      fields: [
        { label: "Child's Full Name", name: "childFullName" },
        { label: "Preferred Name", name: "preferredName" },
        { label: "Date of Birth", name: "childDOB" },
        { label: "Age", name: "childAge" },
        { label: "Grade / School Year", name: "gradeYear" },
        { label: "School Name", name: "schoolName" },
        { label: "City", name: "city" },
        { label: "Gender", name: "childGender" },
        { label: "Primary Language", name: "primaryLanguage" },
        { label: "Other Language", name: "otherLanguage" },
      ],
    },
    {
      title: "Parent / Guardian Information",
      fields: [
        { label: "Guardian Full Name", name: "guardianName" },
        { label: "Relationship to Child", name: "relationship" },
        { label: "Phone", name: "phone" },
        { label: "Email", name: "email" },
        { label: "Preferred Contact", name: "preferredContact" },
        { label: "Guardian Role", name: "guardianRole" },
      ],
    },
    {
      title: "Family & Household",
      fields: [
        { label: "Household Members", name: "householdMembers", wide: true },
        { label: "Significant Family Changes", name: "familyChanges", wide: true },
        { label: "Family Changes Detail", name: "familyChangesDetail", wide: true },
        { label: "Siblings", name: "siblings" },
        { label: "Siblings Detail", name: "siblingsDetail" },
        { label: "Regular Contact with Both Parents", name: "parentContact" },
      ],
    },
    {
      title: "Reason for Seeking Therapy",
      fields: [
        { label: "Main Concern", name: "mainConcern", wide: true },
        { label: "When Concerns First Noticed", name: "onsetConcerns", wide: true },
        { label: "Who Identified Therapy Need", name: "whoIdentifiedTherapy", wide: true },
        { label: "Areas of Concern", name: "concernAreas", wide: true },
        { label: "Functioning Affected", name: "functioningAffected", wide: true },
      ],
    },
    {
      title: "Developmental & Medical History",
      fields: [
        { label: "Pregnancy / Birth Concerns", name: "pregnancyConcerns" },
        { label: "Pregnancy Detail", name: "pregnancyDetail", wide: true },
        { label: "Developmental Milestones", name: "developmentalMilestones" },
        { label: "Milestones Detail", name: "milestonesDetail", wide: true },
        { label: "Diagnosed Medical Conditions", name: "medicalConditions" },
        { label: "Medical Conditions Detail", name: "medConditionsDetail", wide: true },
        { label: "Takes Medications", name: "medications" },
        { label: "Medication Details", name: "medicationsDetail", wide: true },
        { label: "Trauma / Adverse Experiences", name: "traumaHistory" },
        { label: "Trauma Detail", name: "traumaDetail", wide: true },
      ],
    },
    {
      title: "Mental Health & Therapy History",
      fields: [
        { label: "Mental Health Diagnosis", name: "mhDiagnosis" },
        { label: "MH Diagnosis Detail", name: "mhDiagnosisDetail" },
        { label: "Previous Therapy", name: "previousTherapy" },
        { label: "Previous Therapy Detail", name: "prevTherapyDetail", wide: true },
        { label: "Previous Therapy Feedback", name: "prevTherapyFeedback", wide: true },
        { label: "Family Mental Health History", name: "familyMentalHealth" },
        { label: "Family MH Detail", name: "familyMHDetail" },
        { label: "Other Provider", name: "otherProvider" },
        { label: "Other Provider Detail", name: "otherProviderDetail" },
      ],
    },
    {
      title: "School & Social Functioning",
      fields: [
        { label: "Academic Performance", name: "academicPerformance" },
        { label: "Close Friendships", name: "friendships" },
        { label: "Relationship to Adults", name: "adultRelationships" },
        { label: "Bullying", name: "bullying" },
        { label: "Child's Strengths", name: "childStrengths", wide: true },
      ],
    },
    {
      title: "Child's Perspective & Goals",
      fields: [
        { label: "Child Aware of Therapy", name: "childAware" },
        { label: "Child's Perspective", name: "childPerspective", wide: true },
        { label: "Successful Outcome", name: "successOutcome", wide: true },
        { label: "Parent Included in Sessions", name: "parentIncluded" },
        { label: "School Coordination", name: "schoolCoordination" },
        { label: "How Did You Hear About Us", name: "referral" },
      ],
    },
    {
      title: "Safety & Wellbeing",
      fields: [
        { label: "Self-Harm / Suicidal Thoughts", name: "selfHarmThoughts" },
        { label: "Self-Harm Behaviour", name: "selfHarm" },
        { label: "Violence / Abuse Exposure", name: "violenceExposure" },
        { label: "Safe Living Environment", name: "safeEnvironment" },
        { label: "Substance Use Concern", name: "substanceUse" },
        { label: "Additional Safety Context", name: "safetyAdditional", wide: true },
      ],
    },
  ],

  "Blended Family Therapy": [
    {
      title: "Contact Information",
      fields: [
        { label: "Partner 1 — Full Name", name: "partner1Name" },
        { label: "Partner 2 — Full Name", name: "partner2Name" },
        { label: "Phone", name: "phone" },
        { label: "Email", name: "email" },
        { label: "City", name: "city" },
        { label: "Best Days", name: "bestDays" },
        { label: "Preferred Time", name: "preferredTime" },
        { label: "Session Format", name: "sessionFormat" },
      ],
    },
    {
      title: "Your Relationship",
      fields: [
        { label: "How Long Together", name: "togetherness" },
        { label: "How Long Living Together", name: "livingTogether" },
        { label: "Relationship Status", name: "relationshipStatus" },
        { label: "Marriage / Engagement Date", name: "marriageDate" },
        { label: "Second Marriage", name: "secondMarriage" },
      ],
    },
    {
      title: "Partner 1's Children",
      fields: [
        { label: "Number of Children", name: "p1NumChildren" },
        { label: "Ages", name: "p1ChildrenAges" },
        { label: "Primary Residence", name: "p1Residence" },
        { label: "Custody Arrangement", name: "p1Custody" },
        { label: "Other Parent Involvement", name: "p1OtherParent", wide: true },
      ],
    },
    {
      title: "Partner 2's Children",
      fields: [
        { label: "Number of Children", name: "p2NumChildren" },
        { label: "Ages", name: "p2ChildrenAges" },
        { label: "Primary Residence", name: "p2Residence" },
        { label: "Custody Arrangement", name: "p2Custody" },
        { label: "Other Parent Involvement", name: "p2OtherParent", wide: true },
      ],
    },
    {
      title: "Household",
      fields: [
        { label: "Children Together", name: "childrenTogether" },
        { label: "Children Together Detail", name: "childrenTogetherDetail" },
        { label: "Total Household Size", name: "householdTotal" },
        { label: "Special Needs", name: "specialNeeds" },
        { label: "Special Needs Detail", name: "specialNeedsDetail", wide: true },
      ],
    },
    {
      title: "Challenges & Concerns",
      fields: [
        { label: "Primary Concerns", name: "primaryConcerns", wide: true },
        { label: "Most Pressing Challenge", name: "pressingChallenge", wide: true },
        { label: "How Long Challenges Present", name: "challengeDuration" },
      ],
    },
    {
      title: "The Couple Relationship",
      fields: [
        { label: "Relationship Strengths", name: "relationshipStrengths", wide: true },
        { label: "Level of Connection", name: "connectionLevel" },
        { label: "Conflict Frequency", name: "conflictFrequency" },
        { label: "Relationship Goal", name: "relationshipGoal", wide: true },
      ],
    },
    {
      title: "Therapy & Support History",
      fields: [
        { label: "Individual Therapy", name: "individualTherapy" },
        { label: "Previous Couples Therapy", name: "previousCouplesTherapy" },
        { label: "Children in Therapy", name: "childrenPreviousTherapy" },
        { label: "Co-Parenting Support", name: "coParentingSupport" },
        { label: "Past Therapy Feedback", name: "pastTherapyFeedback", wide: true },
      ],
    },
    {
      title: "Goals for Therapy",
      fields: [
        { label: "Successful Outcome", name: "successOutcome", wide: true },
        { label: "Both Partners Willing", name: "bothWilling" },
        { label: "Children in Sessions", name: "childrenInSessions" },
        { label: "How Did You Hear About Us", name: "referral" },
      ],
    },
    {
      title: "Safety & Wellbeing",
      fields: [
        { label: "Domestic Safety Concern", name: "domesticSafety" },
        { label: "Mental Health Crisis", name: "mentalHealthCrisis" },
        { label: "Children at Risk", name: "childrenAtRisk" },
        { label: "Substance Use Concern", name: "substanceUse" },
      ],
    },
  ],
};
