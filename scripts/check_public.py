"""Scan every tracked file at every commit, plus staged paths, before release."""
import re, subprocess, sys
patterns = [
 re.compile(rb"(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})"),
 re.compile(rb"eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}"),
 re.compile(rb"-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----"),
 re.compile(rb"(?:https?://)?(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)"),
]
def git(*args):return subprocess.check_output(['git',*args])
failures=[];seen=set();count=0
for commit in git('rev-list','--all').decode().splitlines():
 for line in git('ls-tree','-r',commit).decode().splitlines():
  header,path=line.split('\t',1);mode,typ,oid=header.split()
  if typ!='blob' or oid in seen:continue
  seen.add(oid);count+=1;data=git('cat-file','blob',oid)
  if any(p.search(data) for p in patterns):failures.append((commit,path))
for path in git('ls-files').decode().splitlines():
 from pathlib import Path
 if any(p.search(Path(path).read_bytes()) for p in patterns):failures.append(('working-tree',path))
if failures:print('Privacy scan failed:',failures);sys.exit(1)
print(f'Privacy scan passed: {count} unique historical blobs plus all tracked working files')
