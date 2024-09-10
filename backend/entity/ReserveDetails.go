package entity

import "gorm.io/gorm"

type ReserveDetails struct {
	gorm.Model

	ReserveID *uint
	Reserve Reserve `gorm:"foreignKey:ReserveID"`

	LockID *string
	Locks Locks `gorm:"foreignKey:LockID"`

	Price float32
}