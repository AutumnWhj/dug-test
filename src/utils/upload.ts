import COS from 'cos-js-sdk-v5';

const cos = new COS({
  SecretId: 'AKIDpX4MPEQRr10oQp0xgJm6HG1WrfGhwzoP',
  SecretKey: 'UnsjR0NbeUCew0rUyKWXUr6BHG6mMl09',
});

export const uploadFile = (file): Promise<string> => {
  return new Promise<any>((resolve) => {
    cos.putObject(
      {
        Bucket: 'image-1256210609',
        Region: 'ap-guangzhou',
        Key: file.name,
        Body: file,
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        console.log('err: ', err);
        console.log(data.Location);
        resolve(data.Location);
      },
    );
  });
};
