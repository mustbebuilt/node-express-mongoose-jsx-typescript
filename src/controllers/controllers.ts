import Film, { IFilm } from "../models/Film";

async function getAllData(): Promise<IFilm[] | { error: string }> {
try {
const films: IFilm[] = await Film.find();
console.dir(films);
return films;
} catch (error) {
console.error("Error retrieving data:", error);
return { error: "Failed to retrieve data" };
}
}

async function getDataById(id: string): Promise<IFilm | null | { error: string }> {
try {
const film: IFilm | null = await Film.findById(id);
return film;
} catch (error) {
console.error("Error retrieving data:", error);
return { error: "Failed to retrieve data" };
}
}

async function getDataByName(filmName: string): Promise<IFilm[] | { error: string }> {
    try {
        const regex = new RegExp(filmName, "i"); // Create a case-insensitive regular expression
        const films: IFilm[] = await Film.find({ filmName: regex });
        return films;
      } catch (error) {
        console.error("Error retrieving data:", error);
        return { error: "Failed to retrieve data" };
      }
    }

    async function getDataByCertificate(filmCertificate: string): Promise<IFilm[] | { error: string }> {
        try {
            const films: IFilm[] = await Film.find({ filmCertificate: filmCertificate });
            return films;
          } catch (error) {
            console.error("Error retrieving data:", error);
            return { error: "Failed to retrieve data" };
          }
        }

        // Date range query
        async function getDataByDateRange(startDate: Date, endDate: Date): Promise<IFilm[] | { error: string }> {
            try {
              const films: IFilm[] = await Film.find({
                releaseDate: {
                  $gte: startDate, // Greater than or equal to startDate
                  $lte: endDate // Less than or equal to endDate
                }
              });
              console.log(films);
              return films;
            } catch (error) {
              console.error("Error retrieving data:", error);
              return { error: "Failed to retrieve data" };
            }
          }


async function createData(data: Partial<IFilm>): Promise<IFilm | { error: string }> {
try {
const newDocument: IFilm = await Film.create(data);
console.log(newDocument);
return newDocument;
} catch (error) {
console.error("Error creating data:", error);
return { error: "Failed to create data" };
}
}

async function updateData(
id: string,
data: Partial<IFilm>
): Promise<IFilm | null | { error: string }> {
try {
const updatedDocument: IFilm | null = await Film.findByIdAndUpdate(id, data, {
new: true,
});
return updatedDocument;
} catch (error) {
console.error("Error updating data:", error);
return { error: "Failed to update data" };
}
}

async function deleteData(id: string): Promise<IFilm | null | { error: string }> {
try {
const deletedDocument: IFilm | null = await Film.findByIdAndDelete(id);
return deletedDocument;
} catch (error) {
console.error("Error deleting data:", error);
return { error: "Failed to delete data" };
}
}

export {
getAllData,
getDataById,
getDataByName,
getDataByCertificate,
getDataByDateRange,
createData,
updateData,
deleteData,
};