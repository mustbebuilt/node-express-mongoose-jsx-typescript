"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const filmSchema = new mongoose_1.default.Schema({
    filmCertificate: String,
    filmName: String,
    filmDescription: String,
    filmImage: String,
    filmPrice: Number,
    filmReview: Number,
    releaseDate: Date,
}, { collection: "filmsCollection" } // Specify the collection name
);
const Film = mongoose_1.default.model("Film", filmSchema);
exports.default = Film;
