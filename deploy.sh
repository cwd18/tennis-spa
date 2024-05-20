# Build and copy the dist folder to the the react folder in 'Tennis web app'
# Run with zsh deploy.sh

# Build the project
npm run build

# Delete the react folder in 'Tennis web app'
rm -rf ../Tennis\ web\ app/react/

# Copy the dist folder to 'Tennis web app'
cp -r dist/ ../Tennis\ web\ app/react/
