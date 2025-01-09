module.exports = {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
