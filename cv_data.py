"""Fingerprint public CV content, excluding private research provenance."""
import hashlib
import json


def cv_source_digest(profile_path, certificates_path):
    profile = json.loads(profile_path.read_text())
    public_profile = {key: value for key, value in profile.items() if not key.startswith('_')}
    data = {'profile': public_profile, 'certificates': json.loads(certificates_path.read_text())}
    payload = json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()
    return hashlib.sha256(payload).hexdigest()
