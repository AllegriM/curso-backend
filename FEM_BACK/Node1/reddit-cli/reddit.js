#! /usr/bin/env node

import fetch from 'node-fetch'
import yargs from 'yargs'
import open from 'open'

const { argv } = yargs(process.argv)

const connectToReddit = async () => {
    const res = await fetch('https://www.reddit.com/.json')
    const data = await res.json()
    const children = data.data.children
    const randomPost = children[Math.floor(Math.random() * children.length)]
    const link = `https://www.reddit.com/${randomPost.data.permalink}`

    if (argv.print) {
        console.log(`
        title: ${randomPost.data.title}
        link: ${link}
        `)
    } else {
        open(link)
    }
    return data
}

connectToReddit().then((data => console.log(data)))
