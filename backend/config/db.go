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
		&entity.Categories{},
		&entity.Shop{},
		&entity.Reserve{},
		&entity.ReserveDetails{},
	)

	Lock := &[]entity.Locks{
		{Id: "A00", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A01", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A02", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A03", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A04", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A05", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A06", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "B00", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B01", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B02", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B03", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B04", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B05", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B06", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "C00", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C01", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C02", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C03", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C04", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C05", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C06", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D16", Status: "ไม่พร้อมใช้งาน", Price: 300, Size: "2x2"},
	}

	for _, lock := range *Lock {
		db.FirstOrCreate(&lock)
	}

	GenderMale := entity.Gender{GenderName: "Male"}
	GenderFemale := entity.Gender{GenderName: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Gender{GenderName: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Gender{GenderName: "Female"})

	hashedPassword, _ := HashPassword("4")

	User := &[]entity.Users{ {
		FirstName: "Four",
		LastName:  "Nuay",
		Email:     "Nuay@gmail.com",
		Password:  hashedPassword,
		Tel:       "000000000",
		Profile:   "https://th.bing.com/th/id/OIP.arl_DZPqNL6ZTs9u_OAdYwAAAA?rs=1&pid=ImgDetMain",
		GenderID:  1,},
		{
		FirstName: "โฟร์",
		LastName:  "นวย",
		Email:     "Nuay1@gmail.com",
		Password:  hashedPassword,
		Tel:       "000000000",
		Profile:   "https://th.bing.com/th/id/OIP.arl_DZPqNL6ZTs9u_OAdYwAAAA?rs=1&pid=ImgDetMain",
		GenderID:  2,},
	}

	for _, user := range *User {
		db.FirstOrCreate(&user)
	}

	Categories := &[]entity.Categories{
		{CategoryName: "นวย1"},
		{CategoryName: "นวย2"},
		{CategoryName: "นวย3"},
		{CategoryName: "นวย4"},
	}

	for _, category := range *Categories {
		db.FirstOrCreate(&category)
	}

	Shop := &[]entity.Shop{
		{NationalID: "123456789" , CategoryID: 1 ,ShopName: "nuay" , Description: "nuayqqqq" ,ShopImg: "https://th.bing.com/th/id/OIP.arl_DZPqNL6ZTs9u_OAdYwAAAA?rs=1&pid=ImgDetMain",UserID: 1},
		{NationalID: "12345678922" , CategoryID: 1 ,ShopName: "nuayeiei" , Description: "nuayqqqq" ,ShopImg: "https://th.bing.com/th/id/OIP.arl_DZPqNL6ZTs9u_OAdYwAAAA?rs=1&pid=ImgDetMain",UserID: 2},
	}

	for _, shop := range *Shop {
		db.FirstOrCreate(&shop)
	}
}
