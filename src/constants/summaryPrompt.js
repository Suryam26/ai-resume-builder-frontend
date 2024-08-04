const summaryPrompt =
    'Job title: {jobTitle}. ' +
    'Based on the job title, generate summary for resume ' +
    'in 4-5 lines in JSON format with list a of JSON having ' +
    'fields: experience_level and summary. ' +
    'With experience levels: Fresher, Mid-Level, Experienced.';

export default summaryPrompt;
