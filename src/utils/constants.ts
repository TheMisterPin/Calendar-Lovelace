interface MonthInfo {
  name: string;

}
export interface DataAttributeHTMLElement extends HTMLElement {
  dataset: {
      [key: string]: string;
  };
}
export const months: MonthInfo[] = [
	{
		name: 'January'
	},
	{
		name: 'February',
	},
	{
		name: 'March',
	},
	{
		name: 'April',
 
	},
	{
		name: 'May',
 
	},
	{
		name: 'June',
   
	},
	{
		name: 'July',
	},  
	{
		name: 'August',
 
	},
	{
		name: 'September',
  
	},
	{
		name: 'October',
  
	},
	{
		name: 'November',
  
	},
	{
		name: 'December',
  
	}
]

export const days: string[]  = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]