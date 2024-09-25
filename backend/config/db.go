package config

import (
	"fmt"
	"time"
	"example.com/project-sa-g03/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
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
		&entity.Gender{},
		&entity.Users{},
		&entity.Categories{},
		&entity.Shop{},
		&entity.Reserve{},
		&entity.ReserveDetails{},
		&entity.Review{},
		&entity.Payment{},
	)

	// สร้างข้อมูลล็อค
	locks := []entity.Lock{
		{Id: "A00", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A01", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A02", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A03", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A04", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A05", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A06", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A07", Status: "ไม่ว่าง", Price: 200, Size: "2x2"},
		{Id: "A08", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "A09", Status: "ว่าง", Price: 200, Size: "2x2"},
		{Id: "B00", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B01", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B02", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B03", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B04", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B05", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B06", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B07", Status: "ไม่ว่าง", Price: 250, Size: "2x2"},
		{Id: "B08", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "B09", Status: "ว่าง", Price: 250, Size: "2x2"},
		{Id: "C00", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C01", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C02", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C03", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C04", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "C05", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C06", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C07", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C08", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "C09", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D00", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D01", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D02", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D03", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "D04", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "D05", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "D06", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "D07", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D08", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "D09", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E00", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E01", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E02", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E03", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E04", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E05", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E06", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "E07", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "E08", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},
		{Id: "E09", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F00", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F01", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F02", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F03", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F04", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F05", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F06", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F07", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F08", Status: "ว่าง", Price: 300, Size: "2x2"},
		{Id: "F09", Status: "ไม่ว่าง", Price: 300, Size: "2x2"},

	}

	for _, lock := range locks {
		db.FirstOrCreate(&lock, entity.Lock{Id: lock.Id}) // ตรวจสอบเงื่อนไขก่อนสร้างข้อมูล
	}

	// สร้างข้อมูลเพศ
	genders := []entity.Gender{
		{GenderName: "Male"},
		{GenderName: "Female"},
		{GenderName: "Not specified"},
		{GenderName: "Ohter.."},
	}

	for _, gender := range genders {
		db.FirstOrCreate(&gender, entity.Gender{GenderName: gender.GenderName})
	}

	// สร้างข้อมูลผู้ใช้
	hashedPassword, _ := HashPassword("4")

	users := []entity.Users{
		{
			FirstName: "FourNuay",
			LastName:  "eiei",
			Email:     "Nuay@gmail.com",
			Password:  hashedPassword,
			Tel:       "0000000000",
			Profile:   "https://th.bing.com/th/id/OIF.fbwj6WknENM1GagLsK5N8Q?rs=1&pid=ImgDetMain",
			GenderID:  1,
		},
		{
			FirstName: "โฟร์นวย",
			LastName:  "z",
			Email:     "Nuay1@gmail.com",
			Password:  hashedPassword,
			Tel:       "0986354894",
			Profile:   "https://th.bing.com/th?id=OIF.P1WILJbFWmg%2bPO%2bvBMCQoA&rs=1&pid=ImgDetMain",
			GenderID:  2,
		},
		{
			FirstName: "สมชาย",
			LastName:  "z",
			Email:     "Somchai@gmail.com",
			Password:  hashedPassword,
			Tel:       "0954735283",
			Profile:   "https://media1.tenor.com/m/a1Oltt0xIwEAAAAC/herta-honkai-star-rail.gif",
			GenderID:  1,
		},
		{
			FirstName: "สมศรี",
			LastName:  "z",
			Email:     "Somsri@gmail.com",
			Password:  hashedPassword,
			Tel:       "0835372356",
			Profile:   "https://cdn3.emoji.gg/emojis/53554-hsr-black-swan-hearts.png",
			GenderID:  2,
		},
		{
			FirstName: "สมปอง",
			LastName:  "z",
			Email:     "Somporng@gmail.com",
			Password:  hashedPassword,
			Tel:       "0912364836",
			Profile:   "https://th.bing.com/th/id/OIP.v-ABqK3AhwIuBqgLr51bjQHaHa?rs=1&pid=ImgDetMain",
			GenderID:  1,
		},
		{
			FirstName: "สมหญิง",
			LastName:  "z",
			Email:     "Somying@gmail.com",
			Password:  hashedPassword,
			Tel:       "0912764938",
			Profile:   "https://upload-os-bbs.hoyolab.com/upload/2024/03/07/7ba48ce676583e027ac4c0f4f651e2d5_343882546897784508.png",
			GenderID:  2,
		},
		{
			FirstName: "สมแล้ว",
			LastName:  "z",
			Email:     "Somleaw@gmail.com",
			Password:  hashedPassword,
			Tel:       "0917628364",
			Profile:   "https://upload-os-bbs.hoyolab.com/upload/2024/03/07/01e8069724fcc8c98e7df4a18abbdaa3_1171276753694896378.png",
			GenderID:  1,
		},
		{
			FirstName: "สมหมาย",
			LastName:  "z",
			Email:     "Sommine@gmail.com",
			Password:  hashedPassword,
			Tel:       "0986354894",
			Profile:   "https://th.bing.com/th/id/OIP.gk666i4qXCuNEQMuSj5r7AHaHa?rs=1&pid=ImgDetMain",
			GenderID:  2,
		},
		{
			FirstName: "สมเสร็จ",
			LastName:  "z",
			Email:     "Somset@gmail.com",
			Password:  hashedPassword,
			Tel:       "0954735283",
			Profile:   "https://i.pinimg.com/236x/f4/bf/29/f4bf29adc5b23fbdac91ef8e47e819b5.jpg?nii=t",
			GenderID:  1,
		},
		{
			FirstName: "สมสู่",
			LastName:  "z",
			Email:     "Somzoo@gmail.com",
			Password:  hashedPassword,
			Tel:       "0835372356",
			Profile:   "https://embed.pixiv.net/decorate.php?illust_id=101950506",
			GenderID:  2,
		},
		{
			FirstName: "สมเด็จ",
			LastName:  "z",
			Email:     "Sompdet@gmail.com",
			Password:  hashedPassword,
			Tel:       "0912364836",
			Profile:   "https://th.bing.com/th/id/OIP.MMwrflW_eMF03oMMXd67HAHaHZ?rs=1&pid=ImgDetMain",
			GenderID:  1,
		},
		{
			FirstName: "สมบูรณ์",
			LastName:  "z",
			Email:     "Sombun@gmail.com",
			Password:  hashedPassword,
			Tel:       "0912764938",
			Profile:   "https://th.bing.com/th/id/OIP.UT9qHtAGsaFR6t11A-Jr1QHaHa?rs=1&pid=ImgDetMain",
			GenderID:  2,
		},
	}

	for _, user := range users {
		db.FirstOrCreate(&user, entity.Users{Email: user.Email})
	}

	// สร้างข้อมูลหมวดหมู่
	categories := []entity.Categories{
		{CategoryName: "ร้านอาหาร"},
		{CategoryName: "ร้านขายสินค้า"},
		{CategoryName: "ร้านบริกาาร"},
	}

	for _, category := range categories {
		db.FirstOrCreate(&category, entity.Categories{CategoryName: category.CategoryName})
	}

	// สร้างข้อมูลร้านค้า
	shops := []entity.Shop{
		{
			NationalID: "1449900123456", CategoryID: 1, ShopName: "เรือนริมน้ำซีฟู๊ด",
			Description: "ช่วงที่ไปคนไม่เยอะซึ่งดีมาก ๆ เป็นร้านอาหารขนาดใหญ่ บรรยากาศดี ติดริมน้ำ", ShopImg: "https://img.wongnai.com/p/800x0/2022/01/13/ef3f7e1d5d5944979ed9b4d74e8d5fad.jpg", UserID: 1,
		},
		{
			NationalID: "1446600852375", CategoryID: 1, ShopName: "บะหมี่ตงเล้ง ",
			Description: "ดึก ๆ ไม่รู้จะกินอะไร แวะมาร้านอาหารสั่งบะหมี่เกี๊ยวกิน บะหมี่เด้งสู้ฟัน หมูแดงชิ้นกำลังดี หวาน ๆ หมูกรอบ", ShopImg: "https://img.wongnai.com/p/1920x0/2019/02/18/8caef6570af3401e91b5d0d4671d2b6a.jpg", UserID: 2,
		},
		{
			NationalID: "1440033659358", CategoryID: 1, ShopName: "นิ-อ่าง น้ำแข็งไส ไอศครีม",
			Description: "ร้านไอศกรีมนิ-อ่าง ที่ลูกค้าค่อนข้างเยอะมาก ๆ เพราะเป็นร้านไอศกรีมไข่แข็ง ไอศกรีมหอมหวาน กับไข่แข็งมัน ๆ", ShopImg: "https://img.wongnai.com/p/1920x0/2014/11/07/ba6b0ae0dc9f4b81a2d6b4ff7f10c9b2.jpg", UserID: 3,
		},
		{
			NationalID: "1325500157356", CategoryID: 1, ShopName: "สุณีข้าวหมูแดง",
			Description: "สุณีข้าวหมูแดง เป็นอีกหนึ่งร้าน ที่เป็นร้านแนะนำสำหรับคนที่ข้าวหมูแดงหมูกรอบ รสชาติดีราคาไม่แพงน้ำราดเข้มข้นมาก ๆ", ShopImg: "https://img.wongnai.com/p/1920x0/2016/06/22/3b00b34877494b0788e274c3de0f7f97.jpg", UserID: 4,
		},
		{
			NationalID: "1320554525757", CategoryID: 2, ShopName: "Pinky Bag ขายส่งกระเป๋า",
			Description: "ขายส่งกระเป๋าแฟชั่นเจ้าใหญ่ราคาโรงงาน สำหรับแม่ค้า ", ShopImg: "https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/306638740_2264945593683870_7556230705413353568_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFI7bZdFf3TBbxSXolf3HB39pAmk45hUGj2kCaTjmFQaMUu5rYOX9SrXemXGcGNFkQoq70D35KB5qIARlC5Iw7J&_nc_ohc=ZCTGVA72LDMQ7kNvgGVBWMN&_nc_ht=scontent-bkk1-1.xx&_nc_gid=AIIt-wIh8uD58YDvHfNAUyQ&oh=00_AYAEyhnKfjklUQoRlzXhbh5wnVqGewrGixQVnprYVOARbQ&oe=66F86130", UserID: 5,
		},
		{
			NationalID: "1445572445385", CategoryID: 2, ShopName: "ร้านบาทาดี",
			Description: "เป็นร้านขายรองเท้ามือสอง สภาพมือหนึ่ง ราคาเข้าถึงได้", ShopImg: "https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/325393341_571240941190220_1725655273051127463_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHga5mLOjd5ZWUhIPdEvdagYHiXowzr8jBgeJejDOvyMNp-rtdSTvk63Spucd1WAQjVGNtezIo98OxTG_r_fubq&_nc_ohc=stjQ_U8AOVsQ7kNvgFa7KRF&_nc_ht=scontent-bkk1-1.xx&_nc_gid=A5JJ3w17mZuf15aqw9AL0gM&oh=00_AYCLPv7SJPAXXlp6pSWZ11-djs2wt833d8g-4DCk57BFlQ&oe=66F846A0", UserID: 6,
		},
		{
			NationalID: "1225433695868", CategoryID: 2, ShopName: "ร้านพลอย",
			Description: "รวมเสื้อผ้าราคามิตรภาพ มีทั้งสินค้ามือหนึ่ง และมือสอง เข้ามาเลือกซื้อได้เลย", ShopImg: "https://th.bing.com/th/id/R.777c3e4e69b0d15c68abf379035b021f?rik=VE%2buIlQWY7Xrhg&riu=http%3a%2f%2fwww.stfrancissquare.com.ph%2fMallTiangge%2fphotos%2fAPPAREL%2fmain%2fk.jpg&ehk=%2fgNwV0%2btNDNbZAviDfyu%2baMsok%2bwx%2bnMlGwbwnbk9Aw%3d&risl=&pid=ImgRaw&r=0", UserID: 7,
		},
		{
			NationalID: "1224533695958", CategoryID: 2, ShopName: "ร้านถ้วยถ้วย",
			Description: "ทำอาหารทั้งที ใช้จานสวย จานดีมีชัยไปกว่าครึ่ง! ก็เพราะเหตุผลนี้แหละที่ทำให้คนรักในการทำอาหาร หรือชอบทานอาหารมองหาภาชนะดีๆ สำหรับใส่อาหารให้ดูหน้าตาน่าทานมากขึ้น", ShopImg: "https://th.bing.com/th/id/R.218570d202fad732a19bddec26b92285?rik=TxRurF0yczGE1Q&pid=ImgRaw&r=0", UserID: 8,
		},
		{
			NationalID: "1324403653526", CategoryID: 3, ShopName: "In THAI Tattoos",
			Description: "in thai tattoos  ยินดีให้บริการ สนใจสักติดต่อได้คับ 0808088800", ShopImg: "https://cdn.zipeventapp.com/blog/2022/03/2022-03-30_05-05-59_ewdwdw-1030x690.jpg?fbclid=IwY2xjawFgk7NleHRuA2FlbQIxMAABHeg5RuWZPiTMwCtvnltGegnyd-lMuArREXX76yKVbtO9ruBlHyvwCuMgww_aem__bguAabd7xVl82jcILKQyA", UserID: 9,
		},
		{
			NationalID: "1334956125425", CategoryID: 3, ShopName: "Le eve Hair Society",
			Description: "ยิ่งสำหรับคนผมยาวอย่างแล้วทางร้านก็มีการบำรุงดีท็อกเส้นผมให้ด้วยค่ะเป็นแบบครีมนวดเย็นๆ ", ShopImg: "https://img.wongnai.com/p/1920x0/2019/05/07/361ebdf1fcfa41a0ad21271f0d62909f.jpg", UserID: 10,
		},
		{
			NationalID: "1448855236756", CategoryID: 3, ShopName: "My Story Nail",
			Description: "ทำเล็บเวลาเปิดร้าน จันทร์ - เสาร์ 11:30 - 21:00", ShopImg: "https://img.freepik.com/premium-photo/hands-young-woman-with-dark-red-manicure-nails_87742-26336.jpg?fbclid=IwY2xjawFgh1tleHRuA2FlbQIxMAABHcNlSr33xAgpR627GcxN4sKgu-AGROmKYsrYQuxGa0nfeHFQh-u7xTyZyQ_aem_01JZDUCdzJmlYLokoZYeDg", UserID: 11,
		},
		{
			NationalID: "1356624587574", CategoryID: 3, ShopName: "ร้านนวดคลายกังวล",
			Description: "เป็นร้านนวดที่ใหญ่ที่สุดในตลาด ราคากันเอง บริการเป็นกันเอง", ShopImg: "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/434323066_895643345905741_8435708011521120583_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFlWrmmmnIobsaxzPIBcrONVDFXgCkOidJUMVeAKQ6J0u4yoUzSVK8PZoOQPhPcEQgytyzgZUbsYzChYTBf6sif&_nc_ohc=hKUp1fvzxxkQ7kNvgHLIJ_m&_nc_ht=scontent-bkk1-2.xx&_nc_gid=A6iFenkSmcVc9KJLX0HfGko&oh=00_AYB0MGu_OYr8h3i8ZCj85OTgEGoCQ9KgyQZdO5TZUJ41Hg&oe=66F85831", UserID: 12,
		},
	}

	for _, shop := range shops {
		db.FirstOrCreate(&shop, entity.Shop{NationalID: shop.NationalID})
	}
	
dateFormat := "2006-01-02"

reserve := []entity.Reserve{
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 1, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 2, TotalPrice: 550 , Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 3, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 4, TotalPrice: 550 , Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 5, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 6, TotalPrice: 550 , Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 7, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 8, TotalPrice: 550 , Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 9, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
    {
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 10, TotalPrice: 550 , Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 11, TotalPrice: 500, Status: "ชำระเงินแล้ว",
    },
	{
        Date: func() time.Time {
            date, err := time.Parse(dateFormat, "2024-09-28")
            if err != nil {
                log.Fatalf("Error parsing date: %v", err)
            }
            return date
        }(),
        ShopID: 12, TotalPrice: 550, Status: "ชำระเงินแล้ว",
    },
}

	for _, reserves := range reserve {
		db.FirstOrCreate(&reserves, entity.Reserve{ShopID: reserves.ShopID, Date: reserves.Date})
	}


	reserveDetails := []entity.ReserveDetails{
		{ReserveID: 1, LockID: "A00"}, {ReserveID: 1, LockID: "D03"}, 
		{ReserveID: 2, LockID: "B00"}, {ReserveID: 2, LockID: "D04"},
		{ReserveID: 3, LockID: "A01"}, {ReserveID: 3, LockID: "D05"}, 
		{ReserveID: 4, LockID: "B01"}, {ReserveID: 4, LockID: "D06"},
		{ReserveID: 5, LockID: "A02"}, {ReserveID: 5, LockID: "E07"},
		{ReserveID: 6, LockID: "B02"}, {ReserveID: 6, LockID: "E08"},
		{ReserveID: 7, LockID: "A03"}, {ReserveID: 7, LockID: "F09"},
		{ReserveID: 8, LockID: "B03"}, {ReserveID: 8, LockID: "C00"},
		{ReserveID: 9, LockID: "A04"}, {ReserveID: 9, LockID: "C01"},
		{ReserveID: 10, LockID: "B04"}, {ReserveID: 10, LockID: "C02"},
		{ReserveID: 11, LockID: "A07"}, {ReserveID: 11, LockID: "C03"},
		{ReserveID: 12, LockID: "B07"}, {ReserveID: 12, LockID: "C04"},
	}

	for _, details := range reserveDetails {
		db.FirstOrCreate(&details, entity.ReserveDetails{ReserveID: details.ReserveID, LockID: details.LockID})
	}

	for _, reserves := range reserve {
		db.FirstOrCreate(&reserves, entity.Reserve{ShopID: reserves.ShopID, Date: reserves.Date})
	}
	

	reviews := []entity.Review{
		{
		Score: 5, Description: "อร่อยมาก", DATETIME: time.Now(),
		ShopID: 1 , UserID: 1,
		},
		{
		Score: 4.5, Description: "พนักงานบริการดีมาก", DATETIME: time.Now(),
		ShopID: 1 , UserID: 2,
		},
		{
		Score: 4.5, Description: "รสชาติดีมาก", DATETIME: time.Now(),
		ShopID: 2 , UserID:31,
		},
		{
		Score: 3, Description: "รอนานนิดหน่อยแต่อร่อย", DATETIME: time.Now(),
		ShopID: 2 , UserID: 4,
		},
		{
		Score: 3.5, Description: "ดีมาก อร่อยมาก", DATETIME: time.Now(),
		ShopID: 3 , UserID: 5,
		},
		{
		Score: 4.5, Description: "อร่อยชื่นใจ", DATETIME: time.Now(),
		ShopID: 3 , UserID: 6,
		},
		{
		Score: 5, Description: "หมูแดงอร่อยมาก", DATETIME: time.Now(),
		ShopID: 4 , UserID: 7,
		},
		{
		Score: 2.5, Description: "หมูเหนียวมาก", DATETIME: time.Now(),
		ShopID: 4 , UserID: 8,
		},
		{
		Score: 5, Description: "สวยมาก บริการดี", DATETIME: time.Now(),
		ShopID: 5 , UserID: 9,
		},
		{
		Score: 4.5, Description: "ดีค่ะ ช่างมือเบามาก", DATETIME: time.Now(),
		ShopID: 5 , UserID: 10,
		},
		{
		Score: 5, Description: "ตัดสวยมาก ถูกใจ", DATETIME: time.Now(),
		ShopID: 6 , UserID: 11,
		},
		{
		Score: 4.5, Description: "บริการดีมาก", DATETIME: time.Now(),
		ShopID: 6 , UserID: 12,
		},
		{
		Score: 5, Description: "ถูกใจ สวยมาก", DATETIME: time.Now(),
		ShopID: 7 , UserID: 1,
		},
		{
		Score: 4.5, Description: "ชอบมาก บริการดี", DATETIME: time.Now(),
		ShopID: 7 , UserID: 2,
		},
		{
		Score: 5, Description: "นวดดีมาก ถูกใจ", DATETIME: time.Now(),
		ShopID: 8 , UserID: 3,
		},
		{
		Score: 4.5, Description: "ดีค่ะ ชอบมาก", DATETIME: time.Now(),
		ShopID: 8 , UserID: 4,
		},
		{
		Score: 5, Description: "กระเป๋าสวยมากกก", DATETIME: time.Now(),
		ShopID: 9 , UserID: 5,
		},
		{
		Score: 5, Description: "สวยมาก ราคาก็ดี", DATETIME: time.Now(),
		ShopID: 9 , UserID: 6,
		},
		{
		Score: 5, Description: "มือสองแต่สภาพดีมาก", DATETIME: time.Now(),
		ShopID: 10 , UserID: 7,
		},
		{
		Score: 4.5, Description: "สวยมากค่าาา", DATETIME: time.Now(),
		ShopID: 10 , UserID: 8,
		},
			{
		Score: 5, Description: "สินค้าดีมากกกก", DATETIME: time.Now(),
		ShopID:11 , UserID: 9,
		},
		{
		Score: 4.5, Description: "ถูกใจมากกกกกก", DATETIME: time.Now(),
		ShopID: 11 , UserID: 10,
		},
			{
		Score: 5, Description: "ลวดลายถูกใจมากค่ะ", DATETIME: time.Now(),
		ShopID: 12 , UserID: 11,
		},
		{
		Score: 4.5, Description: "สวยมากก", DATETIME: time.Now(),
		ShopID: 12 , UserID: 12,
		},
	}

	for _, review := range reviews {
		db.FirstOrCreate(&review, entity.Review{Description: review.Description})
		}

}