I have a musical piece in which there are rules that has to be followed to execute the order of staffs to be played in a movement.

We have staffs numbered from 17 to 38.

The path has to always start from 17 and end with 37 and should always contain all staffs once, without repetitions.

There are exact rules specified from which staff it is possible to go further to which staff.

There is an additional rule sometimes, that in case a staff was performed with a certain tempo, then it can lead to a different next staff, than if it was performed with another tempo. For instance, 17 goes to 18 in case it was performed with tempo 88, but it goes to 20, 27, 29, or 30 if it was performed with a tempo 100. In transitions, we notate it like this:
17: [(18, 88, None), (20, 100, None), (27, 100, None), (29, 100, None), (30, 100, None)]

Also, sometime there is a rule that certain staff can go to another staff only if the staff before that staff was another specified staff. For instance, 20 can go to 21 only if 20 was preceded by 17, but if it was preceded by 24 then it can only go to 21, and if it was preceded by 18, it can go to either 19 or 29. In transitions, we notate it like this:
20: [(21, None, 17), (21, None, 24), (19, None, 18), (29, None, 18)]

These are all rules for the transitions specified for the piece:  transitions = {
    17: [(18, 88, None), (20, 100, None), (27, 100, None), (29, 100, None), (30, 100, None)],
    18: [(19, None, None), (20, None, None)],
    19: [(21, None, None), (23, None, None), (36, None, None)],
    20: [(21, None, 17), (21, None, 24), (19, None, 18), (29, None, 18)],
    21: [(18, 52, 19), (26, 52, 19), (22, 52, 19), (18, 52, 32), (26, 52, 32), (22, 52, 32), (23, 70, 19), (23, 70, 32), (18, 82, 20), (26, 82, 20), (2, 82, 20)],
    22: [(17, None, None), (23, None, None)],
    23: [(26, None, None), (31, None, None)],
    24: [(19, None, None), (20, None, None), (25, None, None), (27, None, None), (29, None, None), (30, None, None)],
    25: [(19, None, None), (24, None, None), (28, None, None), (29, None, None), (30, None, None), (31, None, None), (32, None, None), (34, None, None)],
    26: [(19, None, None), (24, None, None), (27, None, None), (28, None, None), (29, None, None), (35, None, None), (37, None, None)],
    27: [(25, None, None), (28, None, None), (30, None, None), (35, None, None), (37, None, None)],
    28: [(24, None, None), (29, None, None), (19, None, None), (31, None, None), (32, None, None)],
    29: [(24, None, None), (25, None, None), (27, None, None), (30, None, None)],
    30: [(19, None, None), (24, None, None), (25, None, None), (28, None, None), (29, None, None), (31, None, None), (32, None, None), (34, None, None)],
    31: [(18, None, None), (26, None, None), (34, None, None)],
    32: [(21, None, None), (34, None, None), (36, None, None), (38, None, None)],
    33: [(32, None, None), (35, None, None)],
    34: [(27, None, None), (28, None, None), (33, None, None), (35, None, None), (37, None, None)],
    35: [(32, None, None), (33, None, None), (36, None, None)],
    36: [(27, None, None), (28, None, None), (35, None, None), (37, None, None), (38, None, None)],
    38: [(36, None, None), (37, None, None)]
}

Can you write a script for me that finds all possible paths with these rules and writes them into a file “paths.txt”, numbered?
