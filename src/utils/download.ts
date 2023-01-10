import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.toString());
      });
  });
};

/**
 * 打包压缩下载
 * @param data  源文件数组
 * @param fileName  压缩文件的名称
 */
export const compressAndDownload = (data: any[], fileName?: string) => {
  const zip = new JSZip();
  const promises: any[] = []; //用于存储多个promise
  data.forEach((item: any) => {
    const promise = getFile(item.fileUrl).then((res: any) => {
      const fileName = item.fileName;
      zip.file(fileName, res, { binary: true });
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    zip
      .generateAsync({
        type: 'blob',
        compression: 'DEFLATE', // STORE：默认不压缩 DEFLATE：需要压缩
        compressionOptions: {
          level: 9, // 压缩等级1~9    1压缩速度最快，9最优压缩方式
        },
      })
      .then((res: any) => {
        saveAs(res, fileName ? fileName : '压缩包.zip'); // 利用file-saver保存文件
      });
  });
};

export const downloadFile = (url, name) => {
  saveAs(url, name || 'default.pdf');
};
