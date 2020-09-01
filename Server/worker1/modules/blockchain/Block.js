class Block {
  constructor(index, previousHash, timestamp, data, hash, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.nonce = nonce;
  }

  static get genesis() {
    return new Block(
      0,
      "0",
      0,
      { "encodeData": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiR0VORVNJUyIsImlhdCI6MTU5ODE4NjE2N30.MklRVWyHqE3MaAP6zNmG6LdeAFmLQNA1NtzMdh1BpLZuGFHqjewpsp8Uw5nTdpWsvOazMt5ryZwqZ2wsUNAEQB3n1K6pqODcv4I4AJsWMyUx4jLS2JEK7LRNqylTV6qdEmh7md1jNybjQJtUVFd4PBjI3rkSbSilCYBQyuy1EcqEl0D6777faSyOAu_l9KCoG_IIHpJzV4vAYe70lDTlPskFWrbDj6Aq9gNvFIHLDGW1TddeMp6qRYBUM9x5t548e_GL1bmdvgy5djoIw1xCF2AlYhmMl8u6qerIJWny7uk2gN3WsUqgzAYLmzsHLv2n3KuJDNZ7uqfHry-HxKFVFA", "publicKey": "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEApw5iMsBnDlpap9rA3sAtWbs6F6nonwLYjA7pBJfQXc7HLynDlmIh8GpefcN4\nI3FiIE8LwrgmzystgXHsxfQGoi7cmlv305Zy3FUwxKXGf4qWYgYXgbTyQU25+8h9ILIEDLZT\ne8St9t1u7ZlN/mD/SNzlOTmmBt5hP1zflsdR7lE4qHpUGz7Y3EM2IPuXav4qJB1R/nHLm3rX\nxevjQT58pDc7Yt1PKcHtWYOCbH1CEPcRYJ7DtZFghG+DT2egK9rilZ438IffTaSZ7n7CyTs9\nfh+Fbs/agDn2XGPHiEGKDaGwM93jcVvTuFdaGAlbj3u806+8aRkggrbOQkSjp4JEDQIDAQAB\n-----END RSA PUBLIC KEY-----\n" },
      "000848135f415a363b62a40b4cca40e68109c72080d4cedde59ab8e602e112f2",
      1983
    );
  }
}

module.exports = Block;