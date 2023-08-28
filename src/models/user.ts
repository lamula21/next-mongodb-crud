import { Schema, model, models } from 'mongoose'
// models -> all models created by developer

const UserSchema = new Schema({
	// we can also validate
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // regular expression to match
			'Email is not valid', // message
		],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		select: false, // find() won't return password to front-end
	},
	fullname: {
		type: String,
		required: [true, 'Fullname is required'],
		minLength: [3, 'Fullname must be at least 3 characters'],
		maxLength: [50, 'Fullname must be at most 50 characters'],
	},
})

// prevent model User repetitively
const User = models.User || model('User', UserSchema)
export default User
