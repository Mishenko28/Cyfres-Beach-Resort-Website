import { useState } from "react"

const firstNames = [
    "Liam", "Emma", "Noah", "Olivia", "Ava", "Isabella", "Sophia", "Mason", "Logan", "Lucas",
    "Ethan", "James", "Amelia", "Harper", "Evelyn", "Jackson", "Alexander", "Sebastian", "Mateo",
    "Jacob", "Elijah", "Benjamin", "Aiden", "Matthew", "Michael", "Ella", "Scarlett", "Victoria",
    "Emily", "Luna", "Sofia", "Avery", "Mila", "Aria", "Layla", "Chloe", "Grace", "Zoe", "Penelope",
    "Riley", "Levi", "Daniel", "Wyatt", "Gabriel", "Grayson", "Owen", "Henry", "Julian", "Carter",
    "Jaxon", "David", "Isaac", "Jayden", "John", "Luke", "Anthony", "Dylan", "Asher", "Caleb",
    "Josiah", "Christopher", "Lincoln", "Nathan", "Hudson", "Hunter", "Aaron", "Ezra", "Thomas",
    "Charles", "Christian", "Landon", "Adrian", "Jonathan", "Nolan", "Jeremiah", "Easton", "Elias",
    "Colton", "Cameron", "Carson", "Robert", "Angel", "Maverick", "Nicholas", "Dominic", "Cooper",
    "Roman", "Jaxson", "Greyson", "Ian", "Austin", "Santiago", "Jordan", "Brayden", "Xavier",
    "Jose", "Jace", "Everett", "Declan", "Evan", "Kayden", "Parker", "Wesley"
]

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez",
    "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor",
    "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez",
    "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright",
    "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker",
    "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips",
    "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart",
    "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan",
    "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox",
    "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett",
    "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders",
    "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry"
]

function App() {
    const [loadingNo, setLoadingNo] = useState(0)
    const [noOfUser, setNoOfUser] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        for (let i = 0; i < noOfUser; i++) {
            let isNoMatch = false

            while (!isNoMatch) {
                const firstName = firstNames[Math.floor(Math.random() * 100) + 1]
                const LastName = lastNames[Math.floor(Math.random() * 100) + 1]
                const email = firstName + LastName + '@gmai.com'

                const response = await fetch('https://cyfres-beach-resort-api.onrender.com/user/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email.toLocaleLowerCase(), password: 'thomas1228' })
                })

                const json = await response.json()

                if (json.error == 'Email already exist') {
                    continue
                }

                if (Math.random() > 0.5) {
                    await fetch('https://cyfres-beach-resort-api.onrender.com/user/details', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + json.token
                        },
                        body: JSON.stringify({
                            _id: json._id,
                            email: email.toLocaleLowerCase(),
                            name: `${firstName} ${LastName}`,
                            age: Math.floor(Math.random() * 40) + 20,
                            sex: Math.random() > 0.5 ? 'Male' : 'Female',
                            address: 'generated address hehehe',
                            contact: 9090909090
                        })
                    })
                }
                setLoadingNo(p => p + 1)
                isNoMatch = true
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>User Generator In Cyfres Database</h1>
            <div>
                <h2>No. of User to Add:</h2>
                <input type="number" value={noOfUser} onChange={(e) => setNoOfUser(e.target.value)} />
            </div>
            <h2>No. of User Added: {loadingNo}</h2>
            <button>Submit</button>
        </form>
    )
}

export default App
