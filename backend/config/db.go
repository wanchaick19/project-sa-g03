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
		&entity.Locks{},
		&entity.Gender{},
		&entity.Users{},
		&entity.Shop{},
		&entity.Reserve{},
		&entity.ReserveDetails{},
	)


	Lock := &[]entity.Locks{
		{ Id: "A00", Status: "ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A01", Status: "ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A02", Status: "ไม่ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A03", Status: "ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A04", Status: "ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A05", Status: "ไม่ว่าง", Price: 200, Size: "2x2" },
	{ Id: "A06", Status: "ว่าง", Price: 200, Size: "2x2" },
	{ Id: "B00", Status: "ไม่ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B01", Status: "ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B02", Status: "ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B03", Status: "ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B04", Status: "ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B05", Status: "ว่าง", Price: 250, Size: "2x2" },
	{ Id: "B06", Status: "ไม่ว่าง", Price: 250, Size: "2x2" },
	{ Id: "C00", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C01", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C02", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C03", Status: "ไม่ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C04", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C05", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "C06", Status: "ว่าง", Price: 300, Size: "2x2" },
	{ Id: "D16", Status: "ไม่พร้อมใช้งาน", Price: 300, Size: "2x2" },
	}


	for _, lock := range *Lock {
        db.FirstOrCreate(&lock)
    }

	GenderMale := entity.Gender{GenderName: "Male"}
	GenderFemale := entity.Gender{GenderName: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Gender{GenderName: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Gender{GenderName: "Female"})

	hashedPassword, _ := HashPassword("4")
	User := &entity.Users{
		FirstName: "Four",
		LastName:  "Nuay",
		Email:     "Nuay@gmail.com",
		Password:  hashedPassword,
		Tel : "000000000",
		Profile : "https://avatars.githubusercontent.com/u/175175489?v=4",
	}
	db.FirstOrCreate(User, &entity.Users{
		Email: "Nuay@gmail.com",
	})
}

