
import { CborEncoder, CborValue, SelfDescribeCborSerializer, value } from 'simple-cbor';
import { Principal } from '@dfinity/principal';

class PrincipalEncoder implements CborEncoder<Principal> {
  public get name() {
    return 'Principal';
  }

  public get priority() {
    return 0;
  }

  public match(value: any): boolean {
    return value && value._isPrincipal === true;
  }

  public encode(v: Principal): CborValue {
    return value.bytes(v.toUint8Array());
  }
}

const serializer = SelfDescribeCborSerializer.withDefaultEncoders(true);
serializer.addEncoder(new PrincipalEncoder());
