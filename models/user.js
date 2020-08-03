import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const userSchema = new Schema(
	{
		_id: {
			type: Schema.Types.ObjectId,
		},
		email: { type: String },
		password: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		gender: { type: String }, 
	},
	{
		timestamps: true,
	}
)

userSchema.plugin(mongoosePaginate)

export default model('user', userSchema)
