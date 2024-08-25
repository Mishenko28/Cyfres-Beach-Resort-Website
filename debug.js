export let URI
export let frontEmail
export let fronPassword
export let AdminEmail
export let AdminPassword

const isInDevelopment = false

if (isInDevelopment) {
    URI = "http://localhost:5000"
    frontEmail = "johnthomasalog@gmail.com"
    fronPassword = "thomas1228"
    AdminEmail = "thomas28"
    AdminPassword = "thomas1228"
} else {
    URI = "https://cyfres-beach-resort-api.onrender.com"
    frontEmail = ""
    fronPassword = ""
    AdminEmail = ""
    AdminPassword = ""
}