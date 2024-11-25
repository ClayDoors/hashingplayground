COUNT1 = 2
COUNT2 = 2
KIDS1 = b'I am a string'
KIDS2 = b'I am a string'

template = b"""%%PDF-1.4

1 0 obj
<<
  /Type /Catalog

  %% for alignments (comments will be removed by merging or cleaning)
  /MD5_is__ /REALLY_dead_now__
  /Pages 2 0 R
  %% to make sure we don't get rid of the other pages when garbage collecting
  /Fakes 3 0 R
  %% placeholder for UniColl collision blocks
  /0123456789ABCDEF0123456789ABCDEF012
  /0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0
>>
endobj

2 0 obj
<</Type/Pages/Count %(COUNT2)b/Kids[%(KIDS2)b]>>
endobj 

3 0 obj
<</Type/Pages/Count %(COUNT1)b/Kids[%(KIDS1)b]>>
endobj

%% overwritten - was a fake page to fool merging
4 0 obj
<< >>
endobj

"""

contents = template % {
    b'COUNT1': str(COUNT1).encode(),  # Encode integer as bytes
    b'COUNT2': str(COUNT2).encode(),  # Encode integer as bytes
    b'KIDS1': KIDS1,                  # Already bytes
    b'KIDS2': KIDS2                   # Already bytes
}

print(contents.decode())
