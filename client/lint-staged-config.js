const config = {
'"*.{js,ts,tsx}': ['npm run lint', 'npm run format:check'],
'"*.{json,html,yml, yaml}': ['npm run format:check'],
'"*.css': ['npm run lint:stylelint', 'npm run format:check']
}

export default config