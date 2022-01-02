import {
  buildClient,
  buildDecrypt,
  buildEncrypt,
  CommitmentPolicy,
  KmsKeyringNode,
} from '@aws-crypto/client-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private generatorKeyId;
  private keyIds;
  private keyring;
  private context;
  private client: ReturnType<typeof buildEncrypt> &
    ReturnType<typeof buildDecrypt>;

  public constructor() {
    this.generatorKeyId =
      'arn:aws:kms:ap-south-1:422306953298:key/e2b5d3b2-4867-493d-a310-a2bb41e6e195';
    this.keyIds =
      'arn:aws:kms:ap-south-1:422306953298:key/09efcc3b-5fb7-480c-8d2d-620ea9305030';

    this.keyring = new KmsKeyringNode({
      generatorKeyId: this.generatorKeyId,
    });
    this.context = {
      stage: 'portfolio-private',
      purpose: 'secure private keys',
      origin: 'ap-south-1',
    };
    this.client = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT);
  }

  public async encryptData(plainText, ctx = this.context) {
    const { encrypt } = this.client;
    try {
      const { result } = await encrypt(this.keyring, plainText, {
        encryptionContext: ctx,
      });
      return result;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}
