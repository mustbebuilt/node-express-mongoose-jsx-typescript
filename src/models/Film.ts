import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFilm extends Document {
  filmCertificate: string;
  filmTitle: string;
  filmDescription: string;
  filmImage: string;
  filmPrice: number;
  filmReview: number;
  releaseDate: Date;
}

const filmSchema: Schema<IFilm> = new mongoose.Schema(
  {
    filmCertificate: String,
    filmTitle: String,
    filmDescription: String,
    filmImage: String,
    filmPrice: Number,
    filmReview: Number,
    releaseDate: Date,
  },
  { collection: "filmsCollection" } // Specify the collection name
);

const Film: Model<IFilm> = mongoose.model<IFilm>("Film", filmSchema);

export default Film;