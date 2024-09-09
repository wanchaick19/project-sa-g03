package entity

import "gorm.io/gorm"

type Categories struct {
	gorm.Model
	CategoryName string

	Shop []Shop `gorm:"foreignKey:CategoryID"`
}