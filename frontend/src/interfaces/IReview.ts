export interface ReviewInterface{
    ID?: number;
    Score?: number;
    Description?: string; 
    DATETIME?: string;
    ShopID?: number;
    UserID?: number;
    User?: {
    Profile: string; // User's profile picture URL
    FirstName: string; // User's first name
    };
   }
   