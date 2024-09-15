package entity

type Lock struct {
	Id     string `gorm:"PrimaryKey`
	Status string
	Price  float32
	Size   string

	ReserveDetails []ReserveDetails `gorm:"foreignKey:LockID"`
}


