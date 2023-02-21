

export const checkImgExists = (src: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = (): void => {
        if ((img.width > 0 && img.height > 0)) {
          resolve(true);
        }
        resolve(false);
      }
      img.onerror = (): void => {
        resolve(false);
      }
      img.src = src;
    } catch (error) {
      resolve(false);
    }
  })
}


const clearIndexedDb = async (): Promise<boolean> => {
  try {
    const dbs = await window.indexedDB.databases();
    const delReqs = dbs.map((db) => {
      if (db.name) {
        return new Promise((resolve, reject) => {
          const delReq = window.indexedDB.deleteDatabase(db.name!);
          delReq.onsuccess = (e) => {
            resolve(db.name);
          };
          delReq.onblocked = (e) => {
            console.log('onblocked', e, db.name);
            reject();
          };
          delReq.onerror = (e) => {
            console.log('onerror', e, db.name);
            reject();
          };
          delReq.onupgradeneeded = (e) => {
            console.log('onupgradeneeded', e, db.name);
            reject();
          };
        });
      }
      return Promise.resolve('no_name');
    });
    const delRes = await Promise.all(delReqs);
    console.log('Successfully to clearIndexedDb: ', delRes);
    return true;
  } catch (error) {
    console.error('Failed to clearIndexedDb: ', error);
    return false;
  }
};

// 清除本地数据, indexedDB & lcoalStorage
export const clearLocalData = async (): Promise<boolean> => {
  try {
    localStorage.clear();
    await clearIndexedDb();
    return true;
  } catch (error) {
    console.error('clearLocalData', error);
    return false;
  }
};
