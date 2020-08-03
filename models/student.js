import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const studentSchema = new Schema(
	{
		_id: {
			type: Schema.Types.ObjectId,
		},
		ages: { type: Number },
		grades: { type: String },
		classes: { type: String },
		schools: { type: String },
		universities: { type: String },
		qualifications: { type: String },
		curriculum: { type: String },
		schoolCalendar: { type: String },
	},
	{
		timestamps: true,
	}
)

studentSchema.plugin(mongoosePaginate)

export default model('student', studentSchema)
