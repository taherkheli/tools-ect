export interface TreeNode {
  Key_ID: number;         //id
  Head_ID: number;        //parent id
  ID: string;             //name
  Display_Value: string;  //display value
  Description: string;    //description
  Addr?: string;          //Arcnet address
  Global_ID?: string;     //global id???
}