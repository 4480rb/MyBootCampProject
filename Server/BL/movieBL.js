
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const jFaile = require("jsonfile")
const path = require("path")
const movieModel = require('../models/movieModel')
const subscriptionsBL=require('../BL/subscriptionsBL')

const jsonFaile = path.join(__dirname, '../shows.json')
const getAllMoviesFromJson = () => {
    return new Promise((res, rej) => {
        jFaile.readFile(jsonFaile, (err, data) => {
            if (err) {
                rej(err)
            }
            else {
                res(data)
            }
        })
    })

}

const getAllMovies = async () => {
    try {
        let movies = await movieModel.find({})
        return movies;
    }
    catch (err) {
        console.log(err);
    }
}
const getMovieById = async (id) => {
    try {
        let movie = await movieModel.findOne({ _id: id })
        return movie;

    }
    catch (err) {
        console.log(err);
    }
}
const getMovieByName = async (name) => {
    try {
        let movie = await movieModel.findOne({ name: name })
        return movie;

    }
    catch (err) {
        console.log(err);
    }
}
const addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        let movieToDb = new movieModel(movie)
        movieToDb.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(`Movie created with id ${movieToDb.id}`)
            }
        })
    })

}
const addMovies = (movies) => {
    movies.forEach(movie => {
        return new Promise((resolve, reject) => {
            let movieToDB = new movieModel({
                name: movie.name,
                yearPremiered: movie.premiered,
                genres: movie.genres,
                imageUrl: movie.url

            })
            movieToDB.save(err => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('sucsess created')
                }
            });

        })
    });
};

const updateMovie = (id, obj) => {
    return new Promise((resolve, reject) => {
        movieModel.findByIdAndUpdate({ _id: ObjectId(id) }, obj, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(`${data.Name} updated!!😃`)
            }
        })
    })
};



const deleteMovieById = (id) => {
    return new Promise((resolve, reject) => {
        movieModel.findOneAndDelete({ _id: ObjectId(id) }, (err) => {
        
            if (err) {
                reject(err)
            } else {
                subscriptionsBL.deleteSubscriptions(id)
                resolve("Movie deleted👌")

            }

        })


    })
}


module.exports = { getAllMoviesFromJson, getAllMovies,getMovieByName, getMovieById, addMovie, addMovies, updateMovie, deleteMovieById }