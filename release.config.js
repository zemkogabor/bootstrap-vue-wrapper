module.exports = {
    branches: [
        "main"
    ],
    release: {
        branch: "main"
    },
    plugins: [
        '@semantic-release/npm',
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/git',
            {
                assets: ['package.json'],
                message: '${nextRelease.version}',
            },
        ],
    ],
}
