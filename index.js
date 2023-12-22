
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


const askForURL = async () => {
  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL:',
      validate: function (input) {
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(input) || 'Please enter a valid URL';
      },
    },
  ]);

  const enteredURL = response.url;

  const filePath = 'entered_url.txt';
  fs.writeFileSync(filePath, enteredURL);

  console.log(`URL saved to: ${filePath}`);

 
  const qrCode = qr.image(enteredURL, { type: 'png' });
  const qrCodePath = 'qrcode.png';

  // Saving the QR code image to a file
  qrCode.pipe(fs.createWriteStream(qrCodePath));

  console.log(`QR code generated and saved to: ${qrCodePath}`);
};

askForURL();
