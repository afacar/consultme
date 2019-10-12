import ConnectyCube from 'connectycube-reactnative'

class UserService {
	signin(user) {
		console.log("User inside user service", user)
		return new Promise((resolve, reject) => {
			ConnectyCube.createSession(user, (error, session) => {
				session ? resolve(session.user) : reject(error)
			})
		})
	}
}

// create instance
const User = new UserService()

// lock instance
Object.freeze(User)

export default User
