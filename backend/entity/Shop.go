package entity
import "gorm.io/gorm"
type Shop struct {
	gorm.Model
	NationalID string

	CategoryID uint
	Categories Categories `gorm:"foreignKey:CategoryID"`

	ShopName string
	Description string
	ShopImg string

	UserID uint
	Reserve []Reserve `gorm:"foreignKey:ShopID"`
}