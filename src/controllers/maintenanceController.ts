import Film, { IFilm } from "../models/Film";

async function getAllDataToTidy(): Promise<IFilm[] | { error: string }> {
  try {
    const films: IFilm[] = await Film.find();
    console.dir(Film);
    await convertDates(films); // Pass the films array to the convertDates function
    return films;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { error: "Failed to retrieve data" };
  }
}

async function convertDates(films: IFilm[]): Promise<void> {
  try {
    // Iterate over each film document
    for (const film of films) {
      // Convert the releaseDate from string to Date format
      const releaseDate = new Date(film.releaseDate);

      // Update the film document with the converted releaseDate
      await Film.updateOne({ _id: film._id }, { releaseDate });

      // Alternatively, you can use the following code to update and save the document:
      // film.releaseDate = releaseDate;
      // await film.save();
    }

    console.log('Dates converted successfully.');
  } catch (error) {
    console.error('Error converting dates:', error);
  }
}

export { getAllDataToTidy };
