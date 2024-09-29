# API Manajemen Berita

API Manajemen Berita ini adalah sebuah REST API yang dibangun menggunakan **Node.js** dan **Prisma** untuk mengelola artikel berita, kategori, dan peran pengguna (admin dan pengguna biasa). Sistem ini mencakup autentikasi pengguna, kontrol akses berbasis peran, serta operasi CRUD untuk mengelola berita dan kategori.

## Fitur

- **Autentikasi Pengguna**: Registrasi, login, dan logout menggunakan token JWT.
- **Kontrol Akses Berbasis Peran**: Pengguna dengan peran admin dapat mengelola kategori dan berita; pengguna biasa memiliki akses terbatas.
- **Operasi CRUD**: Admin dapat membuat, mengedit, dan menghapus kategori serta artikel berita.
- **Pencarian**: Mencari berita berdasarkan `title`, `id`, atau `categoryId`.
- **Database PostgreSQL**: Menggunakan Prisma ORM untuk terhubung dan berinteraksi dengan database PostgreSQL.
- **Dokumentasi API**: Menggunakan Swagger untuk dokumentasi dan pengujian API.

---

## Endpoint API

### Autentikasi

- **Registrasi Pengguna Baru**: `POST /api/auth/register`
- **Registrasi Admin Baru**: `POST /api/auth/admin/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Get Semua Pengguna**: `GET /api/auth/alluser`

### Manajemen Kategori (Hanya Admin)

- **Buat Kategori**: `POST /api/category/add`
- **Get Semua Kategori**: `GET /api/category/all`
- **Hapus Kategori**: `DELETE /api/category/{id}`
- **Update Kategori**: `PUT /api/category/edit/{id}`

### Manajemen Berita

- **Buat Berita**: `POST /api/news/add` (Hanya Admin)
- **Get Semua Berita**: `GET /api/news/all`
- **Cari Berita**: `GET /api/news/search?categoryId=&title=&id=`
- **Hapus Berita**: `DELETE /api/news/{id}` (Hanya Admin)
- **Update Berita**: `PUT /api/news/edit/{id}` (Hanya Admin)

---

## Instalasi dan Setup

### Clone Repository

```bash
git clone https://github.com/Jenien/news-app.git
cd news-management-api
```

### Instalasi Dependencies

Pastikan Anda telah menginstal **Node.js** dan **npm** atau **Yarn**.

Menggunakan Yarn:
```bash
yarn install
```

### Konfigurasi Variabel Lingkungan

Buat file `.env` di root project dan konfigurasikan variabel lingkungan berikut:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
JWT_SECRET="your_jwt_secret"
```

- **DATABASE_URL**: URL koneksi ke database PostgreSQL Anda.
- **JWT_SECRET**: Secret key untuk penandatanganan token JWT.



### Menjalankan Server

Jalankan server secara lokal:

```bash
yarn dev
```

Server sekarang akan berjalan di `http://localhost:8080`.

## 5. Pengujian API

### Menggunakan Postman

1. **Import Collection:** Anda dapat membuat koleksi di Postman berdasarkan endpoint yang telah dijelaskan.
2. **Buat Request:** Buat request sesuai dengan endpoint dan metode HTTP yang diperlukan.
3. **Autentikasi:** Sertakan token JWT di header `Authorization` untuk endpoint yang memerlukan otorisasi, seperti membuat, mengupdate, atau menghapus kategori dan berita.

### Menggunakan Swagger UI

Swagger UI memungkinkan Anda untuk menguji semua endpoint API langsung dari browser. Pastikan server berjalan, kemudian akses Swagger UI.

## 6. Deployment ke Vercel dengan GitHub Repository

Berikut adalah langkah-langkah untuk mendeploy aplikasi ke Vercel menggunakan repository GitHub:

1. **Persiapkan Repository di GitHub:**
   - Pastikan kode Anda sudah di-push ke repository GitHub.
   - Contoh: [https://github.com/Jenien/news-app]

2. **Login ke Vercel:**
   - Buka situs [Vercel](https://vercel.com/) dan login menggunakan akun GitHub Anda.

3. **Buat Proyek Baru:**
   - Klik tombol "New Project" di dashboard Vercel.
   - Pilih repository GitHub yang ingin Anda deploy (misalnya, `Jenien/news-app`).

4. **Konfigurasi Proyek:**
   - Pastikan Vercel mendeteksi framework yang digunakan (misalnya, Node.js).
   - Atur build command dan output directory jika diperlukan. Untuk proyek Node.js dengan Prisma, biasanya tidak perlu diubah.
   - Tambahkan variabel lingkungan yang sama seperti di file `.env` Anda:
     - **DATABASE_URL:** URL koneksi ke database PostgreSQL produksi.
     - **JWT_SECRET:** Secret key untuk penandatanganan token JWT.

5. **Deploy Proyek:**
   - Klik tombol "Deploy" dan tunggu hingga proses deploy selesai.
   - Setelah selesai, Anda akan mendapatkan URL deploy otomatis seperti `https://news-app-eight-vert.vercel.app/`.

6. **Atur Database Produksi:**
   - Pastikan database PostgreSQL produksi Anda siap dan dapat diakses oleh aplikasi yang dideploy.
   - Perbarui `DATABASE_URL` di variabel lingkungan Vercel dengan URL database produksi Anda.

## 7. Dokumentasi API dengan Swagger

API ini telah didokumentasikan menggunakan Swagger lokal dan publik di postmant. Anda dapat mengakses dokumentasi tersebut di:

```
[https://documenter.getpostman.com/view/35101409/2sAXqzWJWf]
[https://api.postman.com/collections/35101409-7814d1e6-78fa-4fad-86ce-fd04c3b02589?access_key=PMAT-01J8YWM2C94Q8134SQH67S32M0]
```

## 8. Contoh Penggunaan Request (`request.http`) 
### Jika gunakan postman Base Url nya : `https://news-app-eight-vert.vercel.app/`

Berikut adalah contoh penggunaan file `request.http` untuk menguji berbagai endpoint API menggunakan ekstensi **REST Client** di VS Code atau alat serupa:

```http
### Registrasi Pengguna Baru
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "asepee",
  "email": "ase@example.com",
  "password": "password123"
}

### Registrasi Admin Baru
POST http://localhost:8080/api/auth/admin/register
Content-Type: application/json

{
  "name": "jen",
  "email": "ap@example.com",
  "password": "password123"
}

### Login Pengguna
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "ap@example.com",
  "password": "password123"
}

### Logout
POST http://localhost:8080/api/auth/logout
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

### Get Semua Pengguna
GET http://localhost:8080/api/auth/alluser
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

### Buat Kategori
POST http://localhost:8080/api/category/add
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "name": "Deeptalk"
}

### Get Semua Kategori
GET http://localhost:8080/api/category/all
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

### Hapus Kategori
DELETE http://localhost:8080/api/category/1
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

### Update Kategori
PUT http://localhost:8080/api/category/edit/1
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "name": "Teknolokgi"
}

### Buat Berita (Hanya Admin)
POST http://localhost:8080/api/news/add
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "title": "TASK 2",
  "content": "okk",
  "categoryId": 5
}

### Get Semua Berita
GET http://localhost:8080/api/news/all
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

### Cari Berita
GET http://localhost:8080/api/news/search?categoryId=5&title=TASK&id=1
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

### Hapus Berita (Hanya Admin)
DELETE http://localhost:8080/api/news/5
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

### Edit Berita (Hanya Admin)
PUT http://localhost:8080/api/news/edit/5
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "title": "The landss",
  "content": "okk",
  "categoryId": 1
}
```

Ganti `<your_jwt_token>` dengan token JWT yang valid setelah melakukan login.

## Kesimpulan

**API Manajemen Berita** menyediakan solusi yang kuat untuk mengelola pengguna, kategori, dan artikel berita dengan kontrol akses berbasis peran. Sistem ini mudah diskalakan dan dideploy ke lingkungan produksi, serta mencakup mekanisme autentikasi dan otorisasi yang komprehensif.

Pastikan untuk selalu menguji setiap endpoint setelah melakukan perubahan dan menjaga keamanan data dengan baik.

## Kontak

Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, silakan hubungi:

- **Email:** [riska.jeen@gmail.com](mailto:riska.jeen@gmail.com)
- **GitHub Repository:** [https://github.com/Jenien/news-app](https://github.com/Jenien/news-app)
- **GitHub Clone:** [https://github.com/Jenien/news-app.git](https://github.com/Jenien/news-app.git)
- **Link Dokumentasi** : [https://documenter.getpostman.com/view/35101409/2sAXqzWJWf](https://documenter.getpostman.com/view/35101409/2sAXqzWJWf)
- **Link Postmant Collection** : [https://api.postman.com/collections/35101409-7814d1e6-78fa-4fad-86ce-fd04c3b02589?access_key=PMAT-01J8YWM2C94Q8134SQH67S32M0](https://api.postman.com/collections/35101409-7814d1e6-78fa-4fad-86ce-fd04c3b02589?access_key=PMAT-01J8YWM2C94Q8134SQH67S32M0)
- **Link Deploy Backend dengan vercel** : [https://news-app-eight-vert.vercel.app/](https://news-app-eight-vert.vercel.app/) 

