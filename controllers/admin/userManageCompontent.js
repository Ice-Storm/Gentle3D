module.exports.getData = function *() {
  return { 
    userName: '020140wcwz',
    passWord: '3863114Baiyu',
    userNa1me: '020140wcwz',
    passWo0rd: '3863114Baiyu',
    userNa7me: '020140wcwz',
    passWo3rd: '3863114Baiyu'
  }
}

module.exports.getModal = function *(){
  return {
    title: '修改个人信息',
    url: 'indexConfigCompontent',
    type: 'post',
    flag: 'connection'
  }
};

module.exports.getUpload = function *(){
  return { 
    title: '修改头像',
    url: './upload',
    nameArr: ['logo'],
    flag: 'connection',
    entity: 'WebConfig',
    id: '',
    isNew: '',
    content: '',
    value: ''
  }
};