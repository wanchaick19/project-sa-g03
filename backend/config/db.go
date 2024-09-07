package config

import (
	"fmt"


	"example.com/project-sa-g03/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Lock{},
	)


	Lock := &entity.Lock{
		Id: "A00",
		Status:  "ว่าง",
		Price: 200,
		Size:  "2x2 meter",
	}
	db.FirstOrCreate(Lock, &entity.Lock{
		Id: "A00",
	})

}