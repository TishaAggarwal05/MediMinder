export default function getAdherenceStats (medication, daysBack = 7) {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - daysBack + 1);

  let taken = 0;
  let missed = 0;

  medication.status.forEach(entry => {
    const entryDate = new Date(entry.date);
    if (entryDate >= fromDate && entryDate <= today) {
      let flag=0;
      for (const [time, wasTaken] of Object.entries(entry.timeStatus)) {
        if (!wasTaken) {flag=1; missed++;break;}
        
      }
      if(flag==0){taken++;}
    }
  });

  return { taken, missed };
};
