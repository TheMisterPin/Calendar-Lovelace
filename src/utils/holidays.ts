export interface HolidayInfo {
    date: string; 
    name: string; 
    localName:string;
  }

const apiUrl = "https://date.nager.at/api/v3/PublicHolidays/2023/ES";
  
  export async function loadHolidays(year: number): Promise<HolidayInfo[]> {
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error("Error");
      }
  
      const data = await response.json();
  
      const holidays: HolidayInfo[] = data.map((holiday: { date: string, localName: string }) => ({
        date: holiday.date,
        name: holiday.localName,
      }));
  
      return holidays;
    } catch (error) {
      console.error('Error:', error);
      return []
    }
  }