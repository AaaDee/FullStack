var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return blogs
        .map(blog => blog.likes)
        .reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max(...likes)
    const favorites = blogs.filter((blog) =>
        blog.likes === maxLikes
    )
    return favorites[0]
}

const mostBlogs = (blogs) => {
    const counts = _.countBy(blogs, 'author')
    const maxCount = Math.max(...Object.values(counts))
    const author = Object.keys(counts).find((key) => counts[key] === maxCount)

    return ({
        author: author,
        blogs: maxCount
    })
}

const mostLikes = (blogs) => {
    const groups = _.groupBy(blogs, 'author')
    const likes = _.mapValues(groups, totalLikes)
    
    const maxLikes = Math.max(...Object.values(likes))
    const author = Object.keys(likes).find((key) => likes[key] === maxLikes)

    return ({
        author: author,
        likes: maxLikes
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}