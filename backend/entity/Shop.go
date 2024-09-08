package entity
import "gorm.io/gorm"
type Shop struct {
	gorm.Model
	NationalID string
	Categories string
	ShopName string
	Describe string
	
	UserID uint
	Reserve []Reserve `gorm:"foreignKey:ShopID"`
}