ECAP Frontend

This project is part of an educational process automation system integrated with Canvas LMS and SIS (Student Information System). It enables management of courses, assignments, students, learning periods, and synchronizes data between Canvas and SIS for administrators, teachers, and students.

## Key Features

- Integration with Canvas LMS and SIS


- Management of courses, assignments, students, and learning periods
- Modern UI built with Next.js, TailwindCSS, Radix UI
- Form validation using React Hook Form and Zod
- Automatic code formatting and linting with Biome

---

## Getting Started

1. **Install Node.js (recommended v18+) and npm.**

2. **Clone the repository:**
	```powershell
	git clone https://github.com/ecaporg/ECAP-FE.git
	cd ECAP-FE/nextjs
	```

3. **Install dependencies:**
	```powershell
	npm install
	```

4. **Start the development server:**
	```powershell
	npm run dev
	```
	The app will be available at http://localhost:3000

5. **Lint and format code:**
	- Check code style:
	  ```powershell
	  npm run lint
	  ```
	- Format code:
	  ```powershell
	  npm run format
	  ```

6. **Build for production:**
	```powershell
	npm run build
	npm run start
	```

---

## Additional Notes

- Canvas/SIS integration requires appropriate API keys and backend configuration.
- Type and API documentation can be found in the `types/` and `lib/` folders.

---

For more detailed instructions or integration examples, feel free to ask!
