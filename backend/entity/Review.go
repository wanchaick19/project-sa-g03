package entity

import(
	"time"
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model		
	Score		uint		
	Description	string 		
	DATETIME	time.Time

	ShopID	 	uint	
	UserID		uint
	
}