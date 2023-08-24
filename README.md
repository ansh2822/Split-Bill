# SPLIT_BILL
 The **Split Bill** is a simple React application that allows you to manage a list of friends, track their balances, and split bills between you and your friends. The application lets you add new friends, select friends to split bills with, and calculates the expense-sharing based on your inputs.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- View a list of friends with their names, images, and balances.
- Select a friend to split bills with.
- Add new friends to the list.
- Enter bill details and expenses to calculate the sharing.
- Track expenses and balances between you and your friends.

## Getting Started

1. Clone the repository to your local machine using:

   ```bash
   git clone https://github.com/your-username/split-bill.git
   ```

2. Navigate to the project directory:

   ```bash
   cd split-bill
   ```

3. Install the required dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to access the Split Bill App.

## Usage

1. **View Friends**: On the sidebar, you can see a list of your friends along with their names, images, and balances. A green balance indicates that the friend owes you money, while a red balance indicates that you owe money to the friend. An even balance means you and the friend are settled.

2. **Add Friend**: Click the "Add Friend" button to open a form where you can add new friends. Enter the friend's name and image URL, and click "Add" to add the friend to the list.

3. **Select Friend**: Click the "Select" button next to a friend's name to choose that friend for splitting a bill. The selected friend's details will be shown in the form below.

4. **Split Bill**: With a selected friend, enter the bill value and the expenses. You can select whether you or the friend is paying the bill. The app calculates the sharing based on your inputs and updates the balances accordingly.

5. **Close Selection**: Click the "Close" button next to the selected friend's name to unselect the friend.

## Contributing

Contributions are welcome! If you'd like to improve the application or add new features, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or improvement.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

